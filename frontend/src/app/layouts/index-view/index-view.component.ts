import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicatioMessages } from 'src/app/core/utils/messages/applicationMessages';
import { LoadingSpinnerService } from 'src/app/core/spinner/spinner.service';

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
})
export class IndexViewComponent {
  applicationMessages = ApplicatioMessages;

  constructor(
    private activatedRoute: ActivatedRoute,
    public loadingSpinner: LoadingSpinnerService,
  ) {}
}
