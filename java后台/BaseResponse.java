package com.dhcc.base.bean;

public class BaseResponse {
	public String code;
    public String result;
   public BaseResponse(String code,String result){
	   this.code=code;
	   this.result=result;
   }
   public BaseResponse(){
	  
   }
}
