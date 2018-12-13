<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.lang.*"%>
<%@ page import="com.mysql.jdbc.Driver"%>
<%@ page import="net.sf.json.JSONObject"%>
<%@ page import="net.sf.json.JSONArray"%>
<%@ page import="java.sql.*" %>
<%
  //连接数据库
  String url="jdbc:mysql://127.0.0.1/manager?user=root&password=root";
  Class.forName("com.mysql.jdbc.Driver").newInstance();
  Connection connection=DriverManager.getConnection(url);
  Statement statement = connection.createStatement();

  //获取页面参数
  String uid = request.getParameter("uid");
  String oldKey = request.getParameter("oldKey");
  String newKey = request.getParameter("newKey");

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONArray data = new JSONArray();

  String sql="select password from uf_hrresource where uid='"+uid+"'";
  ResultSet rs = statement.executeQuery(sql);
  if(rs.next()) {
    if(oldKey.equals(rs.getString("password"))){
      int flag = statement.executeUpdate("update uf_hrresource set password='"+newKey+"' where uid='"+uid+"'");
      if (flag == 1){
        //修改密码操作
        resultObj.put("msg","修改成功");
      }else{
        resultObj.put("msg","修改失败");
      }
    }else{
      resultObj.put("msg","密码错误");
    }
  }else{
    resultObj.put("msg","用户不存在");
  }

  out.print(resultObj);
  rs.close();
  statement.close();
  connection.close();
%>
