---
title: '删除数据库重复数据'
date: '2023-06-1'
description: '数据库'
---
# 前言
- 在做数据迁移时，由于表没有主键，误操作导致数据重复，需要删除重复数据
```
查询重复数据主键
select id from table group by id having count(*)>1

查询重复数据
select * from table where id in (select id from table group by id having count(*)>1)

删除重复数据
delete from table where (id) in (select id from table group by id having count(*)>1) and rowid not in (select min(rowid) from table group by id having count(*)>1)

```
- 根据多个字段判断重复数据可以把id改成相应字段