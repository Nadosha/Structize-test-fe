#!/bin/bash

# Print the value of the variable 'variables'
echo "Crafting .env file. Keep calm and wait a second..."

merged_json=$(echo "$1" "$2" | jq -s 'add')
touch .env.production
keys=$(echo "$merged_json" | jq -r 'keys[]')

for key in $keys
do
  value=$(echo "$merged_json" | jq -r ".$key")
  if [[ $key == AWS_* ]]; then
      continue
  fi
  echo "$key=$value" >> .env.production
done

cat .env.production