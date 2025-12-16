/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ParentComponent, ParentProps, JSX } from "solid-js";

import Button, { ButtonProps } from "../button";

export interface ModalProps extends ParentProps {
  width?: number;
  title?: JSX.Element;
  buttons?: ButtonProps[];
  onClose?: () => void;
  isMobile?: boolean;
  minButtonWidth?: number;
  btnParentStyle?: JSX.CSSProperties;
}

const Modal: ParentComponent<ModalProps> = (props) => {
  return (
    <div
      class="klinecharts-pro-modal"
      classList={{ "mobile-modal": props.isMobile }}
    >
      <div
        style={{
          width: props.isMobile ? "100%" : `${props.width ?? 400}px`,
          height: props.isMobile ? "100%" : "auto",
          "max-height": props.isMobile ? "100vh" : "90vh",
        }}
        class="inner"
        classList={{ "mobile-inner": props.isMobile }}
      >
        <div
          class="title-container"
          classList={{ "mobile-title": props.isMobile }}
        >
          {props.title}
          <svg
            class="close-icon"
            viewBox="0 0 1024 1024"
            onClick={props.onClose}
          >
            <path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787" />
          </svg>
        </div>
        <div
          class="content-container"
          classList={{ "mobile-content": props.isMobile }}
        >
          {props.children}
        </div>
        {props.buttons && props.buttons.length > 0 && (
          <div
            class="button-container"
          style={props.btnParentStyle}
            classList={{ "mobile-buttons": props.isMobile }}
          >
            {props.buttons.map((button) => {
              return (
                <Button
                  {...button}
                  style={{
                    
                    ...(props.minButtonWidth
                      ? { "min-width": `${props.minButtonWidth}px` }
                      : {}),
                    width: props.isMobile ? "100%" : "auto",
                  }}
                >
                  {button.children}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
