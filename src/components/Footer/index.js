import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import packageJson from "../../../package.json";

const appVersion = packageJson?.version || "0.1.0";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const isLoginFooter =
      this.props.location?.pathname === "/" ||
      this.props.location?.pathname === "/login";

    return (
      <footer className="app-footer">
        {this.props.partnerDetail?.name === "Paralus" && (
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div>
              <span>
                {this.props.partnerDetail?.settings?.copyright || (
                  <>Copyright Paralus &copy; {new Date().getFullYear()}</>
                )}
              </span>
              {this.props.organization?.detail?.spec.type !== "paid" && (
                <>
                  {this.props.partnerDetail &&
                  this.props.partnerDetail.tos_link ? (
                    <a
                      style={{ color: "teal", marginLeft: "10px" }}
                      href={this.props.partnerDetail?.tos_link}
                      target="_blank"
                    >
                      Terms of Service
                    </a>
                  ) : (
                    <a
                      style={{
                        color: "teal",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => this.setState({ open: true })}
                    >
                      Terms of Service
                    </a>
                  )}
                </>
              )}
              <a style={{ color: "teal", marginLeft: "10px" }} href="">
                Privacy Policy
              </a>
            </div>
            {isLoginFooter && (
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                Paralus v{appVersion}
              </span>
            )}
          </div>
        )}
        {this.props.partnerDetail?.name !== "Paralus" && (
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div>
              <span>{this.props.partnerDetail?.settings?.copyright}</span>
              {this.props.userAndRoleDetail?.organization?.type !== "paid" &&
                this.props.partnerDetail &&
                this.props.partnerDetail.tos_link && (
                  <a
                    style={{ color: "teal", marginLeft: "10px" }}
                    href={this.props.partnerDetail?.tos_link}
                    target="_blank"
                  >
                    Terms of Service
                  </a>
                )}
            </div>
            {isLoginFooter && (
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                Paralus v{appVersion}
              </span>
            )}
          </div>
        )}
        <Dialog
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          key="terms-services"
          maxWidth="xl"
        >
          <DialogContent></DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ open: false })}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </footer>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { userAndRoleDetail, organization, partnerDetail } = settings;
  return { userAndRoleDetail, organization, partnerDetail };
};

export default withRouter(connect(mapStateToProps, {})(Footer));
