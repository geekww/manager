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

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONObject rowteam = new JSONObject();

  JSONArray data = new JSONArray();
  JSONArray datateam = new JSONArray();

  // 查询人员
  String sql="select * from uf_teamkey t1,uf_project t2 where t1.pid=t2.pid";

  ResultSet rs = statement.executeQuery(sql);
  ArrayList list = new ArrayList();
  ArrayList listname = new ArrayList();
  while(rs.next()) {
    list.add(rs.getString("pid"));
    listname.add(rs.getString("pname"));
  }

  for(int i=0;i<list.size();i++){
    String sqlteam="select * from uf_team where pname='"+list.get(i)+"'";
    ResultSet rsteam = statement.executeQuery(sqlteam);
    while(rsteam.next()) {
        rowteam.put("panme",rsteam.getString("pname"));
        rowteam.put("dev",rsteam.getString("dev"));
        rowteam.put("duty",rsteam.getString("duty"));
        rowteam.put("detail",rsteam.getString("detail"));
        datateam.add(rowteam);
    }

    row.put("pname",listname.get(i));
    row.put("row",datateam);
    datateam = new JSONArray();
    data.add(row);
  }


  resultObj.put("data",data);
  resultObj.put("code",0);

  out.print(resultObj);

  statement.close();
  connection.close();
%>
