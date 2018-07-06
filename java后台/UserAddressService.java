package com.dhcc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dhcc.dao.UserAddressDao;
import com.dhcc.entity.UserAddress;


@Service
@Transactional
public class UserAddressService {
	@Autowired
	public UserAddressDao dao;

	public void save(UserAddress UserAddress){
		dao.save(UserAddress);
	}
	
	public List<UserAddress>  findUserAddressByUserCode(int userid){//根据用户ID查询
		return dao.findUserAddressByUserCode(userid);
	}
	
	public List<UserAddress>  findUserAddressBySysUserCode(String sysusercode){//根据系统用户CODE查询
		return dao.findUserAddressBySysUserCode(sysusercode);
	}
	
	public UserAddress  findUserAddressById(String id){//根据系统用户CODE查询
		return dao.findUserAddressById(id);
	}
	
	public void delete(int id){
		dao.delete(id);
	}

	public void sysaddresssetdefault(int id, String sysusercode) {
		// TODO Auto-generated method stub
		dao.sysaddresssetdefault(id,sysusercode);
	}
	
	public void updateDefaultUserAddr(int id, int userid) {
		dao.updateDefaultUserAddr(id, userid);
	}

	public UserAddress findDefauleUserAddressByUserid(int userid){
		return dao.findDefauleUserAddressByUserid(userid);
	}

}
