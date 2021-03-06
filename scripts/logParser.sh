SOURCE_LOG_URL=$1
JSON_REGEX='(.*)(LightningInteraction`v0\.2`)(\{.*\:\{.*\:.*\}\}.*})'
MONGO_DB_CONNECTION='127.0.0.1/beacon-db'
DEFAULT_WINDOW_X=1440
DEFAULT_WINDOW_Y=798

echo "Scanning output.log for search-beacon logs..."

# Fetch region boundaries
boundaries=$(mongo --quiet $MONGO_DB_CONNECTION --eval 'printjson(db.featureboundaries.find({ }, { _id : 0 }).toArray())')

# Finds the region for a given point.
# x - {Number} X coordinate
# y - {Number} Y coordinate
find_region()
{
  x=$1;
  y=$2;
  
  rows=$( echo $boundaries | jq '. | length') # Get all region boundaries
  while [ $rows -gt 0 ]; do
  
    x1=$(echo $boundaries | jq ".[$rows-1] .topLeftX");
    x2=$(echo $boundaries | jq ".[$rows-1] .bottomRightX");
    y1=$(echo $boundaries | jq ".[$rows-1] .topLeftY");
    y2=$(echo $boundaries | jq ".[$rows-1] .bottomLeftY");
    rgn_name=$(echo $boundaries | jq ".[$rows-1] .featureName");
        
    # Check if point in within the region boundaries
    if [ $x -ge $x1 ] && [ $x -le $x2 ] && [ $y -ge $y1 ] && [ $y -le $y2 ]; then
      echo $rgn_name;
    fi
    rows=$((rows-1));
  
  done
}

############## MAIN #######################
# read logs and get search-beacon logs
if [ -z "$1" ]; then
 echo "No log file supplied... exiting."

else
  LINE_NUMBER=0;
  while true; do
    echo "reading from line number $LINE_NUMBER";
    result="$(tail -n ${LINE_NUMBER} $SOURCE_LOG_URL | grep '.*Search-Beacon.*')";
    echo "Parsing the logs...";

    LINE_NUMBER='+'$(wc -l < $SOURCE_LOG_URL);
    LINE_NUMBER=$(echo $LINE_NUMBER | tr -d ' ')

    echo "$result" | \
    while IFS= read -r line; do
        region=''
        if [[ $line =~ $JSON_REGEX ]]; then
            json="${BASH_REMATCH[3]}" # Get JSON data
            data=$(echo "$json" | jq '.locator.context');
            x=$(echo "$data" | jq '.pageX');
            y=$(echo "$data" | jq '.pageY');
            windowWidth=$(echo "$data" | jq '.windowWidth');
            windowHeight=$(echo "$data" | jq '.windowHeight');

            #Normalize w.r.t window size.
            x=$((x*DEFAULT_WINDOW_X/windowWidth));
            y=$((y*DEFAULT_WINDOW_Y/windowHeight));

            region=$(find_region $x $y); # Get region for the coordinate
            
            mongo --quiet $MONGO_DB_CONNECTION --eval "var region = '$region'; var x='$x'; var y='$y'; var windowWidth='$windowWidth'; var windowHeight='$windowHeight'" dbscript.js
        else
            echo "$line doesn't match" >&2 # this could get noisy if there are a lot of non-matching logs
        fi
    done

    sleep 10;
  done
fi
