import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Artwork} from "../../../_model/artwork.model";
import {CommonModule} from "@angular/common";
import {TabDirective, TabsetComponent, TabsModule} from "ngx-bootstrap/tabs";
import {GalleryItem, GalleryModule, ImageItem} from "ng-gallery";
import {ArtworkMessageComponent} from "../artwork-message/artwork-message.component";
import {AccountService} from "../../../_services/account.service";
import {take} from "rxjs";
import {User} from "../../../_model/user.model";
import {MessageService} from "../../../_services/message.service";
import { ArtworkLikeButtonComponent } from '../artwork-interaction-buttons/like-button/artwork-like-button.component';
import { ArtworkCommentSectionComponent } from '../artwork-interaction-buttons/comment-section/artwork-comment-section.component';
import {BsModalRef, BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {ReportModalComponent} from "../../modal/report-modal/report-modal.component";

@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css'],
  imports: [CommonModule, TabsModule, GalleryModule, RouterLink, ArtworkMessageComponent,
    ArtworkLikeButtonComponent,ArtworkCommentSectionComponent]
})
export class ArtworkDetailComponent implements OnInit, OnDestroy{
  @ViewChild('artworkTabs', {static: true}) artworkTabs? : TabsetComponent;

  artwork: Artwork | undefined;
  images: GalleryItem[] = [];
  user: User | undefined;
  activeTab?: TabDirective;
  bsModalRef: BsModalRef<ReportModalComponent> = new BsModalRef<ReportModalComponent>();

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private messageService: MessageService,
              private modalService: BsModalService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    });
  }
  ngOnInit() {
    this.route.data.subscribe({
      next: data => {
        this.artwork = data['artwork'];
      }
    });
    this.route.queryParams.subscribe({
      next: params => {
        console.log(params);
        params['tab'] && this.selectTab(params['tab'])
      }
    });
    this.getImages();
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    console.log(this.activeTab.heading);
    console.log(this.activeTab.heading == "Messages" && this.user && this.artwork);
    if (this.activeTab.heading == "Messages" && this.user && this.artwork) {
      this.messageService.createHubConnection(this.user, this.artwork.user.email, this.artwork.id);
    }
    else {
      this.messageService.stopHubConnection();
    }
  }

  selectTab(heading: string) {
    console.log(this.artworkTabs);
    if (this.artworkTabs) {
      this.artworkTabs.tabs.find(x => x.heading === heading)!.active = true;
    }

  }

  getImages() {
    if (!this.artwork) return;

    for (const image of this.artwork.artworkImages) {
      this.images.push(new ImageItem({src: image.imageUrl, thumb: image.imageUrl}));
    }
  }
  openReportModal() {
    const config = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        artwork: this.artwork
      }
    };
    this.bsModalRef = this.modalService.show(ReportModalComponent, config);
  }


  ngOnDestroy() {
    this.messageService.stopHubConnection();
  }
}
