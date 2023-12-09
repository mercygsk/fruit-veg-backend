const React = require('react');

class Index extends React.Component {
    render() {
        const { Vegtables } = this.props;

        return (
            <div>
                <h1>Vegtables Index Page</h1>
                <nav>
                    <a href="/Vegtables/new">Create a New Vegatable</a>
                </nav>
                <ul>
                    {Vegtables.map((Vegtable, i) => {
                        return (
                            <li>
                                The {' '}
                                <a href={`/Vegtables/${i}`}>
                                    {Vegtable.name}
                                </a> {' '}
                                is {Vegtable.color} <br></br>
                                {Vegtable.readyToEat
                                ? `It is ready to eat`
                            :   `It is NOT ready to eat`}
                            <br />
                            </li>
                        )
                    })

                    }
                </ul>
            </div>
        )
    }
}

module.exports = Index;