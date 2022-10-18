const DirViewer = ({ dir }) => {
  if (!dir) {
    return <div></div>
  }

  return <div>
    <h2>{dir.path}</h2>
    <ul>
      {dir.map(f => <li key={f}>{f}</li>)}
    </ul>
  </div>
}

export default DirViewer
