#!/bin/bash

avalanchego_ip=127.0.0.1
avalanchego_port=9650

seconds_to_wait_for_network_start=50

[ $# != 2 ] && echo usage: $0 avash_dir avalanchejs_dir && exit 1

avash_location=$1
avalanchejs_location=$2

export AVALANCHEGO_IP=$avalanchego_ip
export AVALANCHEGO_PORT=$avalanchego_port

# make absolute paths
avash_location=$(cd $avash_location; pwd)
avalanchejs_location=$(cd $avalanchejs_location; pwd)

# create avash ipc fifo
fifo_fname=$avash_location/avash.fifo
rm -f $fifo_fname
mkfifo $fifo_fname
sleep 6000 > $fifo_fname &

# start avash network
cd $avash_location
./avash < $fifo_fname &
echo runscript scripts/five_node_staking.lua >> $fifo_fname 
sleep $seconds_to_wait_for_network_start

# execute tests
cd $avalanchejs_location
yarn test -i --roots e2e_tests

# end avash network
cd $avash_location
echo exit >> $fifo_fname 

# cleanup
rm -f $fifo_fname

