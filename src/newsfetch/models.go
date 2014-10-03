package main

import "time"

const (
	TypeHTML  = "html"
	TypeText  = "text"
	TypeImage = "image"
	TypeVideo = "video"
	TypeAudio = "audio"
	TypeRSS   = "rss"
	TypeXML   = "xml"
	TypeAtom  = "atom"
	TypeJSON  = "json"
	TypePPT   = "ptt"
	TypeLink  = "link"
	TypeError = "error"
)

type Options struct {
	MaxWidth     int
	MaxHeight    int
	Width        int
	Words        int
	Chars        int
	WMode        bool
	AllowScripts bool
	NoStyle      bool
	Autoplay     bool
	VideoSrc     bool
	Frame        bool
	Secure       bool
}

type Author struct {
	Id   []byte    `json:"id"`
	Date time.Time `json:"date"`
	Name string    `json:"name"`
	Url  string    `json:"url"`
}

type Entity struct {
	Id    []byte    `json:"id"`
	Url   string    `json:"url"`
	Date  time.Time `json:"date"`
	Count int       `json:"count"`
	Name  string    `json:"name"`
}

type Image struct {
	Id       []byte    `json:"id"`
	Date     time.Time `json:"date"`
	PicIndex int       `json:"pic_index"`
	Caption  string    `json:"caption"`
	Url      string    `json:"url"`
	Width    int       `json:"width"`
	Height   int       `json:"height"`
	Entropy  float32   `json:"entropy"`
	Size     int       `json:"size"`
}

type Keyword struct {
	Id    []byte    `json:"id"`
	Url   string    `json:"url"`
	Date  time.Time `json:"date"`
	Score int       `json:"score"`
	Name  string    `json:"name"`
}

type Related struct {
	Id              []byte    `json:"id"`
	Date            time.Time `json:"date"`
	Description     string    `json:"description"`
	Title           string    `json:"title"`
	Url             string    `json:"url"`
	ThumbnailWidth  int       `json:"thumbnail_width"`
	Score           float32   `json:"score"`
	ThumbnailHeight int       `json:"thumbnail_height"`
	ThumbnailUrl    string    `json:"thumbnail_url"`
}

type Response struct {
	Id              []byte    `json:"id"`
	OriginalUrl     string    `json:"original_url"`
	Url             string    `json:"url"`
	Type            string    `json:"type"`
	ProviderName    string    `json:"provider_name"`
	ProviderUrl     string    `json:"provider_url"`
	ProviderDisplay string    `json:"provider_display"`
	FaviconUrl      string    `json:"favicon_url"`
	Title           string    `json:"title"`
	Description     string    `json:"description"`
	Date            time.Time `json:"date"`
	Authors         []Author  `json:"authors"`
	Published       int64     `json:"published,omitempty"`
	Lead            string    `json:"lead"`
	Content         string    `json:"content"`
	Keywords        []Keyword `json:"keywords"`
	Entities        []Entity  `json:"entities"`
	RelatedArticles []Related `json:"related,omitempty"`
	Images          []Image   `json:"images"`
}
