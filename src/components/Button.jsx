/* eslint-disable react/prop-types */

function Button({title , handleClick}) {
  return (
    <button className='btn btn-ui' onClick={() => handleClick()}>{title}</button>
  )
}

export default Button