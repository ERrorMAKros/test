import Log from "simple-node-logger" ;
const Environments = {
	ports: {
		http: 3000 ,
		socket: 3001
	} ,
	log: "log.txt" ,
	maxThreads: 5
} ;

export const Logger = Log.createSimpleLogger({ logFilePath: Environments.log });

export default Environments ;