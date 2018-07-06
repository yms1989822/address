package com.dhcc.webservice;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.dhcc.base.bean.BaseResponse;
import com.dhcc.entity.UserAddress;
import com.dhcc.service.UserAddressService;
import com.google.gson.Gson;

@Controller
@RequestMapping("useraddress_service")
public class UserAddressWebService {
	
	@Autowired
	UserAddressService service;
	
	
	@RequestMapping("/add")
	@ResponseBody
	public String add(HttpServletRequest request,HttpServletResponse response){
		
		String json=request.getParameter("json");
		System.out.println(json);
		UserAddress UserAddress=JSON.parseObject(json, UserAddress.class);
		service.save(UserAddress);
		BaseResponse res=new BaseResponse("200", "添加成功");
		return JSON.toJSONString(res);
	}
	
	@RequestMapping("/saveOrUpdateUserAddr")
	@ResponseBody
	public String saveOrUpdateUserAddr(HttpServletRequest request,HttpServletResponse response){
		
		String json=request.getParameter("json");
		System.out.println(json);
		UserAddress UserAddress=JSON.parseObject(json, UserAddress.class);
		service.save(UserAddress);
		int isdefault = UserAddress.getIsdefault();
		if(isdefault==1){
			int id = UserAddress.getId();
			int userid = UserAddress.getUserid();
			service.updateDefaultUserAddr(id, userid);
		}
		BaseResponse res=new BaseResponse("200", "添加成功");
		return JSON.toJSONString(res);
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public String updatepass(HttpServletRequest request,HttpServletResponse response){
		String json=request.getParameter("json");
		System.out.println(json);
		UserAddress UserAddress=JSON.parseObject(json, UserAddress.class);
		service.save(UserAddress);
		BaseResponse res=new BaseResponse("200", "操作成功");
		return JSON.toJSONString(res);
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public String deleteUserAddr(HttpServletRequest request,HttpServletResponse response){
		String id=request.getParameter("id");
		int intValue = Integer.valueOf(id).intValue();
		service.delete(intValue);
		BaseResponse res=new BaseResponse("200", "操作成功");
		return JSON.toJSONString(res);
	}
	
//	@RequestMapping("/updateDefaultUserAddr")
//	@ResponseBody
//	public String updateDefaultUserAddr(HttpServletRequest request,HttpServletResponse response){
//		String id=request.getParameter("id");
//		String userid=request.getParameter("userid");
//		service.updateDefaultUserAddr(id, userid);
//		BaseResponse res=new BaseResponse("200", "操作成功");
//		return JSON.toJSONString(res);
//	}
	
	@RequestMapping("/queryAddressById")
	@ResponseBody
	public String getAddrById(HttpServletRequest request,HttpServletResponse response){
		String id=request.getParameter("id");
		UserAddress findUserAddressById = service.findUserAddressById(id);
		BaseResponse res=new BaseResponse("200", (new Gson()).toJson(findUserAddressById));
		return JSON.toJSONString(res);
	}
	
	@RequestMapping("/queryUserAddressList")
	@ResponseBody
	public String queryUserAddressList(HttpServletRequest request,HttpServletResponse response){
		String userid=request.getParameter("userid");
		List<UserAddress> list=service.findUserAddressByUserCode(Integer.parseInt(userid));
		BaseResponse res=new BaseResponse("200",(new Gson()).toJson(list));
		return JSON.toJSONString(res);
	}
	
	@RequestMapping("/queryDefaultUserAddress")
	@ResponseBody
	public String findDefauleUserAddressByUserid(HttpServletRequest request,HttpServletResponse response){
		String userid=request.getParameter("userid");
		UserAddress userAddress=service.findDefauleUserAddressByUserid(Integer.parseInt(userid));
		BaseResponse res=new BaseResponse("200",(new Gson()).toJson(userAddress));
		return JSON.toJSONString(res);
	}

}
