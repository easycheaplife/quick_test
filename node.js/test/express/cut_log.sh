CURPATH=.
LOGPATH=$CURPATH/logs
logFile=$LOGPATH/express.log
curtime=`date '+%Y-%m-%d-%H-%M-%S'`
backup_name=$LOGPATH/$curtime'.log'
mv $log_file $backup_name
touch $log_file
pm2 reloadLogs
