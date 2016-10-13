create table finance_income(
	id int primary key auto_increment,
    amount int not null,
    times datetime not null,
    explains nvarchar(64),
    genre int not null
);

insert into finance_income values(0,2000,'2016-9-02','',0);
insert into finance_income values(0,1536,'2016-10-03','',0);
insert into finance_income values(0,6253,'2016-11-01','',0);

create table finance_consume(
	id int primary key auto_increment,
    amount int not null,
    times datetime not null,
    explains nvarchar(64),
    genre int not null,
    detail int not null
);







