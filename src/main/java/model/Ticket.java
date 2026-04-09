package com.telecom.backend.model;

import jakarta.persistence.*;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String towerName;
    private String issue;
    private String status = "OPEN";   // 🔥 DEFAULT FIX

    public Long getId() { return id; }

    public String getTowerName() { return towerName; }
    public void setTowerName(String towerName) { this.towerName = towerName; }

    public String getIssue() { return issue; }
    public void setIssue(String issue) { this.issue = issue; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}