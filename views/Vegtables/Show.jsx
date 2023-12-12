const React = require('react');
class Show extends React.Component {
    render () {
        const vegtable = this.props.vegtable;

        return (
            <div>
                <h1>Show Page</h1>
                <p>The {vegtable.name} is {vegtable.color}</p>
                {vegtable.readyToEat ? 'It is ready to eat' : "NOT READY!"}
            </div>

        )
    }
}

module.exports = Show;