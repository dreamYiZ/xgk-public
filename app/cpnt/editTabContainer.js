function EditTabContainer({ children}) {

  return <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 170px)' }}>
    {children}
  </div>

}

export default EditTabContainer
