# Write your MySQL query statement below
SELECT e2.employee_id,  e2.name, count(1) AS reports_count,round(avg(e1.age)) AS average_ageFROM Employees AS e1JOIN Employees AS e2 ON e1.reports_to = e2.employee_idGROUP BY e2.employee_idORDER BY e2.employee_id;
