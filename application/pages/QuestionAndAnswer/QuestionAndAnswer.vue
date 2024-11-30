<template>
	<view class="page">
		<uni-collapse>
			<uni-collapse-item title="Q: 鳗鱼出现厌食或食欲不振怎么办？">
				鳗鱼厌食可能是由于水质问题、饲料质量差或疾病引起的。首先，检查水质参数，如溶解氧、氨氮、亚硝酸盐等，确保水质在正常范围内。其次，确保饲料新鲜且适合鳗鱼的营养需求。最后，观察鳗鱼是否有其他疾病症状，如体表异常或游动异常，必要时请兽医诊断和治疗。
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="Q: 鳗鱼出现体表溃疡或红斑怎么办？">
				体表溃疡或红斑通常是由细菌感染引起的。应立即隔离患病鳗鱼，并对水体进行消毒处理。可以使用抗生素进行治疗，同时定期更换部分水体，保持水质清洁。
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="Q: 鳗鱼游动异常或漂浮不定怎么办？">
				游动异常或漂浮不定可能是水质问题、温度变化或寄生虫感染导致的。首先，检查水质和水温，确保其在鳗鱼适宜的范围内。其次，观察鳗鱼体表是否有寄生虫，如发现应使用合适的药物进行治疗。此外，定期清洁养殖池，减少寄生虫的滋生。
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="Q: 鳗鱼体色变暗或变白怎么办？">
				鳗鱼体色变化可能是由于应激反应、营养不良或疾病引起的。确保养殖环境稳定，避免剧烈变化，如温度、光照或水质的突然变化。提供平衡的饲料，确保鳗鱼摄取足够的营养。如果怀疑是疾病，应请专业兽医进行检查和治疗。
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="Q: 鳗鱼突然大量死亡怎么办？">
	大量死亡通常是严重的水质问题、传染性疾病或中毒造成的。应立即停止饲养操作，检查所有水质参数并采取相应措施，如换水、增氧等。同时，收集死鱼样本送检，确定死亡原因，并根据兽医建议进行处理和预防。
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="Q: 鳗鱼大量聚集在近水面怎么办？">
				鳗鱼大量聚集近水面可能是由于缺氧或水质恶化引起的。首先，检查溶解氧水平，必要时增加增氧设备。其次，检测水中的有害物质，如氨氮、亚硝酸盐等，确保其在安全范围内。如有异常，及时更换部分水体并调整饲养管理措施。
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="Q: 鳗鱼长时间不生长怎么办？">
				鳗鱼生长停滞可能是饲料质量差、养殖密度过高或水质问题引起的。提供高质量的饲料，确保鳗鱼摄取充足的营养。适当控制养殖密度，避免过度拥挤。定期监测和调整水质参数，提供良好的生长环境。
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="Q: 鳗鱼频繁跳跃或躁动不安怎么办？">
				频繁跳跃或躁动不安可能是对环境不适应、寄生虫感染或水质问题引起的。检查水质和水温，确保其在适宜范围内。观察鳗鱼体表是否有寄生虫，如发现应进行治疗。此外，提供遮蔽物或减少光照，降低鳗鱼的应激反应。
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.page{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.circle_container {
		display: flex;
		justify-content: center;
		align-items: center;
		top: 300rpx;
		/* margin-right: 15rpx; */
		margin-top: 120rpx;
		margin-bottom: 40rpx;
		height: 250rpx;
		width: 250rpx;
		border-radius: 50%;
		background-color: rgba(241, 246, 245, 1);
		z-index: 1;
	}
	
	.introduction{
		margin: auto;
		text-align: center;
		
	}
	
	.name{
		font-size: 35rpx;
		margin-bottom: 5rpx;
		color: black;
	}
	
	.version{
		font-size: 20rpx;
		color: rgba(123, 123, 123, 1.0);
		margin-bottom: 400rpx;
	}
	
	.detail{
		display: flex;
		flex-direction: column;
		height: 200rpx;
		width: 90vw;
		line-height: 100rpx;
		text-align: center;
		font-size: 35rpx;
		background-color: #fff;
		border-radius: 20rpx;
		z-index: 1;
	}
	
	button::after{
		border: none;
	}
	
	.numbername{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		text-align: left;
		color: rgba(123, 123, 123, 1.0);
	}
	
	.number{
		text-align: right;
		color: black;
	}
</style>
