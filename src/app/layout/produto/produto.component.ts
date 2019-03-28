import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-produto',
    templateUrl: './produto.component.html',
    animations: [routerTransition()]
})
export class ProdutoComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
