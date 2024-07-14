function EditTabContainer({ children}) {

  return <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 210px)', position: "relative" }}>
    {children}
  </div>

}

export default EditTabContainer
