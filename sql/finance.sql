create table finance_income(
	id int primary key auto_increment,
    amount int not null,
    times nvarchar(10) not null,
    explains nvarchar(64),
    genre int not null
);

insert into finance_income values(0,2000,'2016-10-12','',0);
select * from finance_income;


create table finance_consume(
	id int primary key auto_increment,
    amount int not null,
    times nvarchar(10) not null,
    explains nvarchar(64),
    genre int not null,
    detail int not null
);

