import { Link } from 'react-router-dom'

const Navibar =  () => {
    return(
        <header>
            <div className="#">
                <Link to="/">
                    <h1 className="LevDet">Laeve details</h1>
                </Link>
                
            </div>
        </header>
    )
}

export default Navibar