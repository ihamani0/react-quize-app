
/* eslint-disable react/prop-types */

function Progress({index , numQuestion , totalPoints , points , answer}) {
  return (
    <>
        <progress value={index + Number( answer!==null)} max={numQuestion} />
        <header className="progress">

            {/* starting from 0 so we add 1  */}
            <p>Question <b>{index + 1 }</b> / {numQuestion}</p>

            <p>Question <b>{points }</b> / {totalPoints}</p>
        </header>

    </>
  )
}

export default Progress