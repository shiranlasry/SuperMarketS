
const ResetPassword = () => {
  return (
    
    <div>
        <form className="login-form" >
        <input
          type="email"
          placeholder="דואר אלקטרוני*"
         
          title="Enter a valid email address"
        />
        
        <button type="submit" className="login-btn">
          איפוס סיסמה
        </button>
        <button type="submit" className="forgot-password">
         להתחברות
        </button>
      </form>
    </div>
  )
}

export default ResetPassword