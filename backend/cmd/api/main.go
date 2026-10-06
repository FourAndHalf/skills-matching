package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type match struct { ID string `json:"id"`; Title string `json:"title"`; Company string `json:"company"`; Status string `json:"status"`; Score int `json:"score"` }

var demoMatches = []match{
	{ID: "ops-coordinator", Title: "Operations Coordinator", Company: "Northstar Logistics", Status: "strong_match", Score: 92},
	{ID: "programme-delivery", Title: "Programme Delivery Manager", Company: "Civic Bridge", Status: "potential_match", Score: 78},
	{ID: "resilience-lead", Title: "Security & Resilience Lead", Company: "Haven Systems", Status: "mandatory_gap", Score: 64},
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, _ *http.Request) { w.WriteHeader(http.StatusOK); _, _ = w.Write([]byte(`{"status":"ok"}`)) })
	mux.HandleFunc("GET /api/v1/matches", func(w http.ResponseWriter, _ *http.Request) { w.Header().Set("Content-Type", "application/json"); _ = json.NewEncoder(w).Encode(demoMatches) })
	log.Println("skills matching API listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
