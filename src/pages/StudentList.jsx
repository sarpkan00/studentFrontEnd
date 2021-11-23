import React, { useEffect, useState } from "react";
import { Table, Header, Icon, Button, TableBody } from "semantic-ui-react";
import StudentService from "../services/studentService";
import StudentAdd from "./StudentAdd";
import StudentDelete from "./StudentDelete";
import StudentUpdate from "./StudentUpdate";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    let studentService = new StudentService();
    studentService
      .getStudents()
      .then((result) => {setStudents(result.data) 
       });
  }, []);

    return (
      <div >
        <Header as="h2">
          <Icon name="list alternate outline" />
          <Header.Content>Student List</Header.Content>
        </Header>
        <Table color="blue" key="blue" >
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell><StudentAdd/></Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Güncelleme</Table.HeaderCell>
              <Table.HeaderCell>Silme</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <TableBody>
             {students.map(a=>(
                <Table.Row key={a.id}>
                  <Table.Cell>{a.id}</Table.Cell>
                  <Table.Cell>{a.firstName}</Table.Cell>
                  <Table.Cell>{a.lastName}</Table.Cell>
                  <Table.Cell> <StudentUpdate oldData={a} id={a.id} /></Table.Cell>
                  <Table.Cell><StudentDelete id={a.id} /></Table.Cell>
                 
                  
                </Table.Row>
                ))}

            </TableBody>
        </Table>
      </div>
    );
  
}
