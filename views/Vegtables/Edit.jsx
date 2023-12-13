const React = require('react');

class Edit extends React.Component {
    render() {
        return (
            <div>
                <h1> Edit the Vegtables</h1>
                <form action={`/vegtables/${this.props.vegtable._id}?_method=PUT`} method="POST">
                    Name: <input type="text" name="name" defaultValue={this.props.vegtable.name} /><br />
                    Color: <input type="text" name="color" defaultValue={this.props.vegtable.color} /><br />
                    Is Ready To Eat:
                    {this.props.vegtable.readyToEat ? <input type="checkbox" name="readyToEat" defaultChecked /> : <input type="checkbox" name="readyToEat" />}
                    <br />
                    <input type="submit" value="Submit Changes" />
                </form>
            </div>

        )
    }
}
module.exports = Edit;