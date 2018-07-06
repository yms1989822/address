package com.dhcc.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.dhcc.entity.UserAddress;

@Repository
public class UserAddressDao {
	@Autowired
    public HibernateTemplate hibernateTemplate;
	public void save(UserAddress UserAddress){
		hibernateTemplate.saveOrUpdate(UserAddress);
	}
	
	@SuppressWarnings("unchecked")
	public List<UserAddress>  findUserAddressByUserCode(int userid){//根据用户ID查询
		List<UserAddress> list=(List<UserAddress>) hibernateTemplate.findByNamedParam("from UserAddress where userid=:userid", "userid", userid);
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public UserAddress findDefauleUserAddressByUserid(int userid){//查询默认地址
		UserAddress userAddress = null;
		List<UserAddress> list=(List<UserAddress>) hibernateTemplate.findByNamedParam("from UserAddress where userid=:userid and isdefault = '1'" , "userid", userid);
		if(list!=null && !list.isEmpty()){
			userAddress = list.get(0);
		}
		return userAddress;
	}
	
	@SuppressWarnings("unchecked")
	public List<UserAddress>  findUserAddressBySysUserCode(String sysusercode){//根据系统用户code查询
		List<UserAddress> list=(List<UserAddress>) hibernateTemplate.findByNamedParam("from UserAddress where sysusercode=:sysusercode order by isdefault desc", "sysusercode", sysusercode);
		return list;
	}
	
	public void delete(int id){
		hibernateTemplate.delete(hibernateTemplate.get(UserAddress.class, id));
	}
	public UserAddress getUserAddressById(int id){
		return hibernateTemplate.get(UserAddress.class, id);
	}
	
	@SuppressWarnings("unchecked")
	public UserAddress  findUserAddressById(String id){//根据ID查询
		int intId = Integer.valueOf(id).intValue();
		UserAddress userAddress = null;
		List<UserAddress> userAddressList= (List<UserAddress>) hibernateTemplate.findByNamedParam("from UserAddress where id=:id", "id", intId);
		if(userAddressList!=null && !userAddressList.isEmpty()){
			userAddress = userAddressList.get(0);
		}
		return userAddress;
	}

	public void sysaddresssetdefault(int id, String sysusercode) {
		// TODO Auto-generated method stub
		Object[] value={sysusercode};
		hibernateTemplate.bulkUpdate("update UserAddress set isdefault=0 where sysusercode=?", value);
		Object[] value1={id};
		hibernateTemplate.bulkUpdate("update UserAddress set isdefault=1 where id=?", value1);
	}
	
	public void updateDefaultUserAddr(int id, int userid) {

		Object[] value={userid};
		hibernateTemplate.bulkUpdate("update UserAddress set isdefault=0 where userid=?", value);
		Object[] value1={id};
		hibernateTemplate.bulkUpdate("update UserAddress set isdefault=1 where id=?", value1);	}
	
}
