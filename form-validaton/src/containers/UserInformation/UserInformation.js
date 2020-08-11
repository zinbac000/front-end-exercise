import React, { Component } from "react";
import classes from "./UserInformation.module.css";
import FormControl from "../../components/FormControl/FormControl";
import { validate } from "../../shared/utilities/validationUtils";
import Modal from "../../components/Modal/Modal";

export default class UserInformation extends Component {
  state = {
    controls: {
      firstName: {
        value: "",
        config: {
          controlType: "input",
          type: "text",
          placeholder: "Họ",
          customclass: classes.FormControlInline
        },
        errors: null,
        validation: {
          required: true
        }
      },
      lastName: {
        value: "",
        config: {
          controlType: "input",
          type: "text",
          placeholder: "Tên",
          customclass: classes.FormControlInline
        },
        errors: null,
        validation: {
          required: true
        }
      },
      userName: {
        value: "",
        config: {
          controlType: "input",
          type: "text",
          placeholder: "Tài khoản"
        },
        errors: null,
        validation: {
          required: true
        }
      },
      email: {
        value: "",
        config: {
          controlType: "input",
          type: "email",
          placeholder: "Email"
        },
        errors: null,
        validation: {
          required: true,
          isEmail: true
        }
      },
      password: {
        value: "",
        config: {
          controlType: "input",
          type: "password",
          placeholder: "Mật khẩu"
        },
        errors: null,
        validation: {
          required: true,
          minLength: 7
        }
      },
      confirmedPassword: {
        value: "",
        config: {
          controlType: "input",
          type: "password",
          placeholder: "Xác nhận"
        },
        errors: null,
        validation: {
          required: true
        }
      }
    },
    showModal: false
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ controls: { ...this.state.controls, [name]: { ...this.state.controls[name], value } } });
  };

  renderControls = () => {
    return Object.entries(this.state.controls).map(([controlKey, controlObj]) => (
      <FormControl
        key={controlKey}
        name={controlKey}
        {...controlObj.config}
        value={controlObj.value}
        onChange={this.handleInputChange}
        errors={controlObj.errors}
      />
    ));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let isFormValid = true;
    const newControls = { ...this.state.controls };
    Object.entries(newControls).forEach(([controlKey, controlObj]) => {
      newControls[controlKey] = { ...controlObj, errors: validate(controlObj.value, controlObj.validation) };
      isFormValid &= newControls[controlKey].errors.length === 0;
    });

    if (newControls.confirmedPassword.value !== newControls.password.value) {
      newControls.confirmedPassword.errors.push("Password not match.");
      isFormValid &= false;
    }

    if (isFormValid) {
      this.setState({ controls: newControls, showModal: true });
    } else {
      this.setState({ controls: newControls });
    }
  };

  handleCloseModal = () => this.setState({ ...this.state, showModal: false });

  render() {
    const { lastName, firstName, email, userName, password } = this.state.controls;
    return (
      <>
        <div className={classes.UserInformation}>
          <h1 className={classes.FormCaption}>THÔNG TIN NGƯỜI DÙNG</h1>
          <form className={classes.Form} noValidate onSubmit={this.handleSubmit}>
            {this.renderControls()}
            <button className={classes.ButtonSubmit}>XÁC NHẬN</button>
          </form>
        </div>
        <Modal modalOpen={this.state.showModal} onModalClosed={this.handleCloseModal}>
          <div className={classes.UserInfo}>
            <h2>XÁC NHẬN THÔNG TIN</h2>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>Họ</td>
                  <td>
                    <strong>{firstName.value}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Tên</td>
                  <td>
                    <strong>{lastName.value}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Tài khoản</td>
                  <td>
                    <strong>{userName.value}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <strong>{email.value}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Mật khẩu</td>
                  <td>
                    <strong>{password.value}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ textAlign: "center" }}>
              <button className={classes.ButtonClose} onClick={this.handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
