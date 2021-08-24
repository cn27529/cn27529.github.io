#!/bin/sh
#Tutorial exercise 7-2 #Initialise variable continue as "y"

continue y
while [...] # condition to continue the repetition:
#condition
do
# get the input of a station name
result=`grep -w "^$station" STATIONS.TXT`
if [ -z "$result" ]; then # the input station is not in the file
echo
else # the input station is in the file.
echo
#ask user whether want to continue
done
echo End of the search program.
INSERT --
