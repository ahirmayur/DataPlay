package main

type User struct {
	Uid      int `primaryKey:"yes"`
	Email    string
	Password string
}

func (u User) TableName() string {
	return "priv_users"
}

type Tracking struct {
	Id   int `primaryKey:"yes"`
	User string
	Guid string
}

func (t Tracking) TableName() string {
	return "priv_tracking"
}

type Index struct {
	Guid    string
	Name    string
	Title   string
	Notes   string
	CkanUrl string
	Owner   int
}

func (i Index) TableName() string {
	return "index"
}

type OnlineData struct {
	Guid        int `primaryKey:"yes"`
	Datasetguid string
	Tablename   string
	Defaults    string
}

func (o OnlineData) TableName() string {
	return "priv_onlinedata"
}

type StatsCheck struct {
	Id     int `primaryKey:"yes"`
	Table  string
	X      string
	Y      string
	P1     int
	P2     int
	P3     int
	Xstart int
	Xend   int
}

func (s StatsCheck) TableName() string {
	return "priv_statcheck"
}

type StringSearch struct {
	Tablename string
	X         string
	Value     string
	Count     int
}

func (s StringSearch) TableName() string {
	return "priv_stringsearch"
}

type TableSchema struct {
	ColumnName string
	DataType   string
}

func (t TableSchema) TableName() string {
	return "information_schema.columns"
}