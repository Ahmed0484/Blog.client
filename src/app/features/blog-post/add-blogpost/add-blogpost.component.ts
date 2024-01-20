import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../blog-post.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit,OnDestroy {
  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible : boolean = false;
  imageSelectorSubscription?: Subscription;
  
  constructor(private blogPostService: BlogPostService,
    private categoryService:CategoryService,
    private router: Router,private imageService: ImageService) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories:[]
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    
    this.imageSelectorSubscription = this.imageService.onSelectImage()
    .subscribe({
     next: (selectedImage) => {
       this.model.featuredImageUrl = selectedImage.url;
       this.closeImageSelector();
     }
    })
 }

  onFormSubmit():void{
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}
