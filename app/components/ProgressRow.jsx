export default function ProgressRow(props) {
    return(
      <tr>
        <td><input type="text" name="" value={props.exercise}/></td>
        <td><input type="text" name=""  value={props.weight}/></td>
        <td><input type="text" name=""  value={props.reps}/></td>
        <td><input type="text" name=""  value={props.notes}/></td>
      </tr>
    );
  }