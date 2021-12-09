import { connect } from 'react-redux'

import './Alert.scss'

//Компонент для оповещения о действиях клиента и ошибках сервера
const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
  <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    { alert.msg }
  </div>
))


const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert)