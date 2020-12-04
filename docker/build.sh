 #!/bin/bash
basedir=$(dirname "$SCRIPT")
cd basedir
docker-compose -f docker-compose.yml up
