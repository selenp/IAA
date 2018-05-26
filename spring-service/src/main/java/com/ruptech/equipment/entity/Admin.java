package com.ruptech.equipment.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(indexes = {
        @Index(name = "IDX_admin_token", columnList = "token", unique = true),
        @Index(name = "IDX_admin_name", columnList = "userid", unique = true),
})
public class Admin {
    static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String token;
    private String userid;
    private String password;
    private String fullname;
    private String avatar;
    private String roles; //"assert manager", "assert distributor"
    private String createdDate;

    @PrePersist
    void preInsert() {
        if (this.createdDate == null)
            this.createdDate = sdf.format(new Date());
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}


