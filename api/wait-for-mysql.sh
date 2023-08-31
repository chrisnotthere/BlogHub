#!/bin/bash
# Shebang specifying we want to use the bash shell

set -e
# Exit script immediately if any command returns a non-zero status

host="$1"
# Capture the first argument and store it as the MySQL host
shift
# Shift all positional parameters down, removing the first argument

cmd="$@"
# Store remaining arguments as the command to be executed

# Loop until a connection to MySQL can be established
until mysql -h"$host" -P3306 -uroot -ppassword -e 'select 1'; do
  # Redirecting message to stderr
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

# Redirecting message to stderr
>&2 echo "MySQL is up - executing command"
# Execute the command that was passed in as an argument
exec $cmd
