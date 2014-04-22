package main

func GetCache(key string) string {
	database := GetDB()
	defer database.Close()
	var result string
	database.QueryRow("select contents from priv_cache where cid = ?", key).Scan(&result)
	return result
}

func SetCache(key string, value string) {
	database := GetDB()
	defer database.Close()
	database.Exec("INSERT INTO `priv_cache` (`cid`, `contents`) VALUES (?, ?);", key, value)
}