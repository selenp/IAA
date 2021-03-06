package com.accenture.svc.dir.iaa.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;

@Entity
@Table(indexes = {
        @Index(name = "IDX_Dictionary", columnList = "category,data", unique = true),
})

public class Dictionary {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String category;

    private String data;
    private String categoryName;
    private int rank = 0;

    public static Dictionary as(String category, String categoryName, String data) {
        Dictionary dictionary = new Dictionary();
        dictionary.setCategory(category);
        dictionary.setCategoryName(categoryName);
        dictionary.setData(data);
        return dictionary;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Dictionary rankUp() {
        rank++;
        return this;
    }
}

