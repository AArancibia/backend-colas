import { SistradocService } from './sistradoc.service';
export declare class SistradocController {
    private sistradocService;
    constructor(sistradocService: SistradocService);
    getAreas(): Promise<any>;
}
