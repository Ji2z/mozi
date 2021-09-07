package com.sweet.mozi.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Beverage {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	private String name;
	private String type;
	private String category;
	private String company;
	private String serviceTel;
	private String allergy;
	private String caution;
	private String comparison;
}
