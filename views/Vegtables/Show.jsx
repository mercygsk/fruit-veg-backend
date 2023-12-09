const React = require('react');
class Show extends React.Component {
    render () {
        const Vegtable = this.props.Vegtable;

        return (
            <div>
                <h1>Show Page</h1>
                <p>The {Vegtable.name} is {Vegtable.color}</p>
                {Vegtable.readyToEat ? 'It is ready to eat' : "NOT READY!"}
            </div>

        )
    }
}

module.exports = Show;