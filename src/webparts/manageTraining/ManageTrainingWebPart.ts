import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ManageTrainingWebPartStrings';
import ManageTraining from './components/ManageTraining';
import { IManageTrainingProps } from './components/IManageTrainingProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
export interface IManageTrainingWebPartProps {
  description: string;
}

export default class ManageTrainingWebPart extends BaseClientSideWebPart<IManageTrainingWebPartProps> {

  public render(): void {

    SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.css");

    const element: React.ReactElement<IManageTrainingProps > = React.createElement(
      ManageTraining,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
