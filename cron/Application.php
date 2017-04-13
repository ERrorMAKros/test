<?php

require_once 'MysqliDb.php';

class MySQL
{
    const HOST = "localhost";
    const USER_NAME = "root";
    const PASS = "";
    const DB = "test";
    const TABLE = "projects";
}

class Application
{
    const IS_DEBUG = true;
    const THREADS_MAX = 5;
    
    static public function debug($description, $value = null)
    {
        if (!self::IS_DEBUG)
            return;
        
        if (isset($value))
            switch (gettype($value)) {
                case "object":
                case "array":
                    $value = json_encode($value, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
                    break;
            };
        
        echo ("{$description} {$value}" . "\n");
    }
    static public function errLog($message, $exit = false)
    {
        !$exit ? self::debug($message) : exit($message);
    }
    static public function getDB()
    {
        $_db = new MysqliDb(MySQL::HOST, MySQL::USER_NAME, MySQL::PASS, MySQL::DB);
        
        if ($_db->connect() && isset($_db) && $_db->getLastError() != null) {
            self::errLog($_db->getLastError(), true);
        } else
            return $_db;
    }
    
    static public function initialize()
    {
        $activeThreadsCount = self::getActiveThreadsCount();
        if ($activeThreadsCount < self::THREADS_MAX) {
            
            /* debug */ self::debug("initialize()", $activeThreadsCount . " of " . self::THREADS_MAX . " is busy");
            
            $free = self::getNewProject();
            $free = !is_null($free) ? $free : self::getOldProject();
            
            if (!is_null($free)) {
                
                $id = $free["id"];
                $freeThread = $activeThreadsCount + 1;
                
                /* debug */ self::debug("initialize([free])", $free);

                self::threadGetterSetter($id, $freeThread);
                self::CalcBids($id, $freeThread);
                
                $now = new DateTime();
                self::threadGetterSetter($id, 0, $now->getTimestamp());
                
                exit("[done]");
                
            } else
                exit("[exit] No matching threads found");
        } else
            exit("[exit] No free threads found");
    }
    
    static private function getActiveThreadsCount()
    {
        $result = self::getDB()->where('thread != 0')->getValue(MySQL::TABLE, "count(*) ");

        return $result;
    }
    static private function getNewProject()
    {
        $threads = self::getDB()->where('lastUpdate = ? and thread = ?', array(0, 0))
		->orderBy("id", 'desc')
		->get(MySQL::TABLE, self::THREADS_MAX, array("id", "thread", "lastUpdate"));

        return (bool) count($threads) ? $threads[rand(0, count($threads) - 1)] : null;
    }
    static private function getOldProject()
    {
        $limit   = time() - 7 * 24 * 60 * 60;
        $threads = self::getDB()->where('lastUpdate < ? and thread = ?', array($limit, 0))->orderBy("lastUpdate", 'asc')->getOne(MySQL::TABLE);

        return $threads;
    }
    
    static private function CalcBids($id, $thread)
    {
        if (!is_int($thread) || !(bool) $thread || $thread > self::THREADS_MAX) {
            self::errLog("Bad tread =  $thread", true);
        } else {
            
            $range = array(
                "min" => 10 /* 60 */ ,
                "max" => 15  /* 60 * 60 */
			);

            $performanceSecondsRange = rand($range["min"], $range["max"]);
            
            /* debug */ self::debug("CalcBids([ProjectID , thread])", array("ProjectID" => $id, "thread" => $thread));
            /* debug */ self::debug("Wait for performance ($performanceSecondsRange seconds...)");

            sleep($performanceSecondsRange);
        }
    }
    static private function threadGetterSetter($id, $thread, $lastUpdate = null)
    {
        
        /* debug */ self::debug("threadGetterSetter([" . time() . "][id , thread , isTimeUpdate])", array($id, $thread, $lastUpdate));
        
        $data = array();
        $data['thread'] = $thread;
        if ($lastUpdate)
            $data["lastUpdate"] = $lastUpdate;
        if (!self::getDB()->where('id', $id)->update(MySQL::TABLE, $data))
            self::errLog($_db->getLastError(), true);
    }
}

Application::initialize();
?>