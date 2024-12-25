import { RouteInterface } from "./Router";
import Block from "../core/block";
interface RouteProps {
  rootQuery: string;
}

class Route implements RouteInterface {
  private _pathname: string;
  private _blockClass: new (props: any) => Block;  // A constructor type for the block class
  private _block: Block | null;
  private _props: RouteProps;

  constructor(pathname: string, view: new (props: any) => Block, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      // this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  private _renderDom(query: string, block: Block): void {
    const root = document.querySelector(query);
    if (root) {
      const content = block.getContent();
      if (content) {
        root.innerHTML = "";
        root.append(content);
      }
    }
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass({});
    }

    // this._block.show();
    this._renderDom(this._props.rootQuery, this._block);
    this._block.componentDidMount();
  }
}

export default Route;
