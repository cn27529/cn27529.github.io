#!/bin/bash
while read line ; do
    echo "$line"
done < STATIONS.TXT
echo The number of Words:
wc -m STATIONS.TXT
echo The number of lines:
wc -l STATIONS.TXT
